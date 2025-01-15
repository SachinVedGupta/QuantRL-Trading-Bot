
start virt env
1. python3 -m venv .venv OR python -m venv .venv
2. source venv/bin/activate OR .\.venv\Scripts\Activate.ps1
3. pip install -r requirements.txt

start server
1. cd ./server/scripts/tensorflow
2. python trades_server.py

start client
1. cd client
2. npm i (install node modules if needed)
3. npm run dev
