
# Welcome to the Pharmacy Center

## Backend instructions

To run: source venv/bin/activate

To sign up: send POST request with email and password to localhost:8000/api/users/

To login: send POST request with registered e-mail and password to localhost:8000/api/auth/login/

To send or receive an order: send POST or GET request to localhost:8000/api/orders/. User must be logged in.
