# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_view, name='login'),           # Show login page first
    path('signup/', views.signup_view, name='signup'),
    path('home/', views.index, name='home'),            # Main dashboard after login
    path('billing/', views.billing, name='billing'),
    path('payment/', views.payment, name='payment'),
    path('logout/', views.logout_view, name='logout'),
]
