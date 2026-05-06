import json
import sys
import requests

def get_summary():
    try:
        response = requests.get('http://localhost:3000/orders')
        orders = response.json()

        if not orders:
            print("📊 No orders yet.")
            return

        total_orders = len(orders)
        total_revenue = sum(order['amount'] for order in orders)
        avg_amount = total_revenue / total_orders

        print(f"📊 Order Summary")
        print(f"   Total orders: {total_orders}")
        print(f"   Total revenue: ${total_revenue}")
        print(f"   Average order: ${avg_amount:.2f}")
    except Exception as e:
        print(f"❌ Error fetching orders: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    get_summary()