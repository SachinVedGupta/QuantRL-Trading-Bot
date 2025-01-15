
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

retrain/rerun the model for new outputs (for a new simulation run through) (the GUI will be updating with the new model data and simulation run through)
1. cd ./server/scripts/tensorflow
2. python rl_trader.py -m <test OR train>
      example: "python rl_trader.py -m test"
      note: can modify the num_episodes in rl_trader.py if desired (run time may vary based on device)
3. To view reward data for each episode run "python plot_rl_rewards.py -m <test OR train>". This can help to understand how the model performs on average (amoung all the episodes/simulation run throughs)
4. The next.js front end should now update with the new model results

features coming soon
1. User enters 3 stocks for their fund (compared to the 3 pre-chosen stocks), and model trades them based on up to date data (via yahoo finance api)
2. Model training takes place on AWS Sagemaker (allowing it to be much faster)
3. Backend (flask) deployed on AWS EC2
4. Frontend deployed on Vercel
5. Connect to banking/stock app like Wealthsimple/Robinhood so it can actually execute the trades and make money
