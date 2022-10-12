import datetime, uuid
from helpers import *
from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")


# Socket events
@socketio.on('connect')
def connected():
    print('Connected')


@socketio.on('disconnect')
def disconnected():
    print('Disconnected')


@socketio.on('TransactionAdded')
def transaction_added(message):
    print('Transaction added, return all finished ones')
    response = list(reversed(completed_transactions))
    emit('transactionAddedResponse', {'data': response}, broadcast=True)


# A dictionary containing all the accounts
account_balances = {}

# A (crude) array-log containing all the transactions performed
completed_transactions = []

@app.route('/')
def Index():
    message = 'Welcome.'

    return message, 200

# Transactions route for returning all transactions with a GET, and add a new transaction if POST
@app.route('/transactions', methods=['POST', 'GET'])
@app.route('/transactions/')
@app.route('/transactions/<string:transaction_id>')
def Transactions(transaction_id=None):
    if request.method == 'POST':
        # This should be filled to the brim with errorhandling really...
        data = request.json
        account_id = data.get('account_id')
        amount = data.get('amount')
        # Make sure we got both account_id and amount, and that the account_id leads to an account
        if not account_id or not validateInt(amount):
            return Http_errors(400)

        # Get current balance and calculate new one
        current_balance = 0
        if account_balances.get(account_id):
            current_balance = account_balances.get(account_id)

        balance_after = current_balance + int(amount)

        # Create a new transaction object to both add to the completed transaction-logs and return to the user
        new_transaction = {
            'transaction_id': str(uuid.uuid4()),
            'account_id': account_id,
            'amount': int(amount),
            'balance_after': balance_after,
            'created_at': str(datetime.datetime.now())
        }
        completed_transactions.append(new_transaction)

        # Update users new balance
        account_balances[account_id] = balance_after

        return jsonify(new_transaction), 201
    elif request.method == 'GET':
        # Return all transactions here
        if not transaction_id:
            return jsonify(list(reversed(completed_transactions))), 200

        a_transaction = Find(completed_transactions, transaction_id)
        if not a_transaction:
            return Http_errors(404)

        message = {
            'transaction_id': transaction_id,
            'account_id': a_transaction['account_id'],
            'amount': a_transaction['amount'],
            'created_at': a_transaction['created_at']
        }
        return message, 200
    else:
        # Not a POST nor a GET?
        return Http_errors(405)


# Get the amount on a specific account
@app.route('/accounts')
@app.route('/accounts/')
@app.route('/accounts/<string:account_id>')
def Accounts(account_id=None):
    if not account_id:
        return Http_errors(400)
    balance = account_balances.get(account_id)
    if not balance:
        return Http_errors(404)
    message = {'account_id': account_id, 'balance': balance}
    return message, 200


@app.route('/ping')
def Ping():
    return 'pong', 200


if __name__ == "__main__":
    socketio.run(app, debug=True)
