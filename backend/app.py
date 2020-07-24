from flask import Flask, request, jsonify, make_response
from flask_restx import Api, Resource, fields
import pickle
import numpy as np
import sys


flask_app = Flask(__name__)
app = Api(app=flask_app, version="1.0", title="Iris Plant Identifier", description="Predict the type of iris plant")

name_space = app.namespace('prediction', description='Prediction API')

model = app.model('Prediction params',{
    'sepalLength': fields.String(required=True, description="Sepal Length", help="Sepal Length can not be blank"),

    'sepalWidth': fields.String(required=True, description="Sepal Width", help="Sepal Width can not be blank"),

    'petalLength': fields.Integer(required=True, description="Petal Length", help="Petal Length can not be blank"),
    'petalWidth':fields.Integer(required = True, description="Petal Width", help="Petal Width can not be blank")
})
filename = 'classifier'
outfile = open(filename, 'rb')
classifier = pickle.load(outfile)

@name_space.route("/")
class MainClass(Resource):

    def options(self):
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin",'*')
        response.headers.add("Access-Control-Allow-Headers",'*')
        response.headers.add("Access-Control-Allow-Methods",'*')
        return response

    @app.expect(model)
    def post(self):
        try:
            formData = request.json
            data = [val for val in formData.values()]

            prediction = classifier.predict(np.array(data).reshape(1,-1))
            types ={0:"Iris Setosa", 1:"Iris Versicolour",2:"Iris Virginica"}


            response = jsonify({
               "statusCode":200,
               "status":"Prediction made",
               "result":"The type of iris plant is:" + types[prediction[0]]
            })
            response.headers.add('Access-Control-Allow-Origin','*')
            return response
        
        except Exception as error:
            return jsonify({
                "statusCode": 500,
                "status": "Could not make prediction",
                "error": str(error)
            })


if __name__=='__main__':
    flask_app.run(debug=True)