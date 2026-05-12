from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel,Field,computed_field
from typing import Literal,Annotated
import pickle
import pandas as pd


#defining the tier of city 
#if city is not in list it will automatically store in tier 3

tier_1_cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune"]
tier_2_cities = [
    "Jaipur", "Chandigarh", "Indore", "Lucknow", "Patna", "Ranchi", "Visakhapatnam", "Coimbatore",
    "Bhopal", "Nagpur", "Vadodara", "Surat", "Rajkot", "Jodhpur", "Raipur", "Amritsar", "Varanasi",
    "Agra", "Dehradun", "Mysore", "Jabalpur", "Guwahati", "Thiruvananthapuram", "Ludhiana", "Nashik",
    "Allahabad", "Udaipur", "Aurangabad", "Hubli", "Belgaum", "Salem", "Vijayawada", "Tiruchirappalli",
    "Bhavnagar", "Gwalior", "Dhanbad", "Bareilly", "Aligarh", "Gaya", "Kozhikode", "Warangal",
    "Kolhapur", "Bilaspur", "Jalandhar", "Noida", "Guntur", "Asansol", "Siliguri"
]



#import ML model 

with open("model.pkl","rb") as f:
    model=pickle.load(f)

app=FastAPI()


@app.get("/")
def home():
    return {"message":"working"}

#pydantic model

class User_Input(BaseModel):
    age:Annotated[int,Field(...,gt=0,description="enter your age",examples=[18])]
    weight:Annotated[float,Field(...,gt=0,description="enter your weight in kg",examples=[67.50])]
    height:Annotated[float,Field(...,gt=0,description="Enter height in cm",examples=[178])]
    income_lpa:Annotated[float,Field(...,gt=0,description="Enter height income in LPA",examples=[17])]
    smoker:Annotated[Literal["true","false"],Field(...,description="Do you smoke ans in true/false",examples=["false"])]
    city:Annotated[str,Field(...,max_length=50,description="Enter your city",examples=["pune"])]
    occupation:Annotated[Literal['retired', 'freelancer', 'student', 'government_job',
    'business_owner', 'unemployed', 'private_job'],Field(...,description="Enter your occupation",examples=['private_job'])]


    @computed_field
    @property
    def bmi(self) ->float:
        bmi=round(self.weight/(self.height**2),2)
        return bmi
    
    @computed_field
    @property
    def lifestyle_risk(self) -> str:
        if self.smoker and self.bmi > 30:
            return "high"
        elif self.smoker or self.bmi > 27:
            return "medium"
        else:
            return "low"

    @computed_field
    @property
    # Feature 2: Age Group
    def age_group(self) -> str:
        if self.age < 25:
            return "young"
        elif self.age < 45:
            return "adult"
        elif self.age < 60:
            return "middle_aged"
        return "senior"
    
    @computed_field
    @property
    def city_tier(self) -> int:
        # Feature 4: City Tier
        if self.city in tier_1_cities:
            return 1
        elif self.city in tier_2_cities:
            return 2
        else:
            return 3

@app.post("/predict")
def predict_premium(data:User_Input):

    input_df=pd.DataFrame([{
        "bmi":data.bmi,
        "age_group":data.age_group,
        "lifestyle_risk":data.lifestyle_risk,
        "city_tier":data.city_tier,
        "income_lpa": data.income_lpa,
        "occupation":data.occupation

    }])


    prediction=model.predict(input_df)[0]

    return JSONResponse(status_code=200,content={"predicted_category":prediction})