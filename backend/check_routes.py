from main import app

print("Checking all routes...")
for route in app.routes:
    if hasattr(route, 'methods'):
        methods = list(route.methods) if hasattr(route.methods, '__iter__') else [route.methods]
        print(f"Method(s): {methods}, Path: {route.path if hasattr(route, 'path') else 'N/A'}")
    else:
        print(f"Route: {route}")

# Let's specifically look for the chat endpoint
print("\nLooking for /chat endpoint...")
for route in app.routes:
    try:
        if hasattr(route, 'path') and route.path == '/chat':
            print(f"Found /chat endpoint with methods: {list(route.methods)}")
            break
    except:
        continue
else:
    print("No /chat endpoint found")