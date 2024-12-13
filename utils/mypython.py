import json
import re
from datetime import datetime

# Regular expression patterns for extracting transaction details
# Regular expression patterns for extracting transaction details
debit_pattern = r"Rs\.(\d+(\.\d+)?) transferred from A/c \.\.\.(\d+) to:(UPI/\d+)\. Total Bal:Rs\.(\d+(\.\d+)?)CR\..*Avlbl Amt:Rs\.(\d+(\.\d+)?).*?\((\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2})\)"
credit_pattern = r"Rs\.(\d+(\.\d+)?)\s+Credited\s+to\s+A/c\s+\.\.\.(\d+)\s+thru\s+(UPI/\d+)\s+by\s+([\w\d_@-]+)\. Total\s+Bal:Rs\.(\d+(\.\d+)?)CR\. Avlbl\s+Amt:Rs\.(\d+(\.\d+)?)\((\d{2}-\d{2}-\d{4}\s+\d{2}:\d{2}:\d{2})\)"

# Function to categorize transaction based on message content
def categorize_transaction(message):
    # Check for debit transaction
    debit_match = re.search(debit_pattern, message)
    if debit_match:
        amount = float(debit_match.group(1))
        sender_account = debit_match.group(3)
        recipient_info = debit_match.group(4)
        balance = float(debit_match.group(5))
        transaction_date = debit_match.group(9)
        return {
            'type': 'Debit',
            'amount': amount,
            'sender': sender_account,
            'recipient': recipient_info,
            'balance': balance,
            'date': transaction_date
        }

    # Check for credit transaction
    credit_match = re.search(credit_pattern, message)
    if credit_match:
        amount = float(credit_match.group(1))
        recipient_account = credit_match.group(3)
        transaction_info = credit_match.group(4)
        credited_by = credit_match.group(5)
        balance = float(credit_match.group(6))
        transaction_date = credit_match.group(10)
        return {
            'type': 'Credit',
            'amount': amount,
            'recipient': recipient_account,
            'sender': credited_by,
            'transaction_info': transaction_info,
            'balance': balance,
            'date': transaction_date
        }

    # If no match found
    return None

# Function to read and analyze JSON file, categorize transactions, and print relevant information
def read_and_analyze_json(json_file):
    transactions = '''{
    "sms": ['''
    try:
        # Open and read the JSON file
        with open(json_file, 'r', encoding='utf-8') as file:
            data = json.load(file)

        # Loop through the data and process each message
        for key, value in data.items():
            for i in value:
                # Check for specific conditions in the message body
                if "UPI/" in i["@body"] and "ઉપલબ્ધ" not in i["@body"] and "A/c ...0145" in i["@body"]:
                    # Categorize the transaction
                    # print(i["@body"])
                    transaction = categorize_transaction(i["@body"])
                    if transaction:
                         transactions += str(transaction) + ","
                    else:
                        print(i["@body"])

        return transactions
    except Exception as e:
        print(f"An error occurred while analyzing the JSON file: {e}")

# Usage example

# Replace 'data.json' with the path to your JSON file
json_file = 'output.json'
myTxt = open("transaction.json","w")
# read_and_analyze_json(json_file)
read_and_analyze_json(json_file)
myTxt.write(read_and_analyze_json(json_file).replace("'", '"')+"]}")
