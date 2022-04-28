import json
import sys

import pandas as pd

location = None

for line in sys.stdin:
    data = json.loads(line)
    location = data.get("location")

df = pd.DataFrame(pd.read_csv("./data/DATA.csv", sep=",", header=0))
df.drop(["measure", "metric", "age", "upper", "lower"], axis=1, inplace=True)

df_pivot = df.pivot_table(values="val", index=["location", "year", "sex"], columns="cause", aggfunc="mean", margins=False, dropna=True, fill_value=None)

temp_json = df_pivot.loc[location, "Alcohol use disorders"].to_json(orient="table")
temp_dict = json.loads(temp_json)

data = {"name": "Alcohol use disorders", "data": temp_dict["data"]}

print(json.dumps(data))
