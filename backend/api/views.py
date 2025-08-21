from django.shortcuts import render
import stripe
from django.conf import settings
from django.http import JsonResponse

stripe.api_key = settings.STRIPE_SECRET_KEY

# Create your views here.
def create_payment_intent(request):
    intent = stripe.PaymentIntent.create(
        amount=500,  # 5 USD in cents
        currency='usd',
        payment_method_types=['card'],
    )
    return JsonResponse({'clientSecret': intent['client_secret']})