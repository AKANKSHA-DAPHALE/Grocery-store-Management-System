from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User
from django.db import IntegrityError

def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        # Debug print
        print(f"Attempting login with username: {username}")
        
        # Check if username and password are provided
        if not username or not password:
            messages.error(request, "Please enter both username and password.")
            return render(request, 'login.html')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            messages.success(request, "Successfully logged in!")
            return redirect('home')
        else:
            messages.error(request, "Invalid username or password. Please try again.")
            print("Authentication failed")
            # Clear the password field
            request.POST = request.POST.copy()
            request.POST['password'] = ''
    
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    messages.success(request, "Successfully logged out!")
    return redirect('login')

@login_required(login_url='/login/')
def index(request):
    return render(request, 'index.html')

@login_required(login_url='/login/')
def billing(request):
    return render(request, 'billing.html')

@login_required(login_url='/login/')
def payment(request):
    return render(request, 'payment.html')

def signup_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        # Validate passwords match
        if password1 != password2:
            messages.error(request, "Passwords don't match!")
            return render(request, 'signup.html')

        try:
            # Create new user
            user = User.objects.create_user(username=username, email=email, password=password1)
            messages.success(request, "Account created successfully! Please login.")
            return redirect('login')
        except IntegrityError:
            messages.error(request, "Username already exists!")
        except Exception as e:
            messages.error(request, "An error occurred. Please try again.")

    return render(request, 'signup.html')


