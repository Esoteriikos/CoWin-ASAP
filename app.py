import pandas as pd
from datetime import date, timedelta
from flask import Flask, render_template, request, send_from_directory, Response, jsonify
app = Flask(__name__)


# today to 2 next days
dateRange = 4




@app.route('/', methods =["GET", "POST"])
def home():
    # Read district name id list
    dist_map = pd.read_csv("static/district_mapping.csv")
    dist_dict = dict(dist_map.values)

    # get dates
    date_range = pd.date_range(start=date.today(), end=date.today()+timedelta(days=(dateRange))).strftime("%d-%m-%Y").tolist()

    return render_template('home_request.html', district_mapping= dist_dict, dates=date_range)


@app.route('/wrapper/', methods =["GET", "POST"])
def process():
    # data = request.json
    # print(type(data))
    # return str(data)

    # data = request.args.get('district_id')

    return render_template('wrapper.html')



if __name__ == '__main__':
   app.run(debug = True)