# Helper functions

# Finds a specific transaction
def Find(transaction_list, transaction_id):
    for transaction in transaction_list:
        if transaction['transaction_id'] == transaction_id:
            return transaction


# Discerns wether passed value is an int
def validateInt(value):
    try:
        int(value)
        return True
    except:
        return False


# Returns a message related to entered http error
def Http_errors(code):
    if code == 400:
        return 'Missing parameters', 400
    elif code == 404:
        return 'Not found'
    elif code == 405:
        return 'Specified HTTP method not allowed', 405
    elif code == 415:
        return 'Specified content type not allowed', 415