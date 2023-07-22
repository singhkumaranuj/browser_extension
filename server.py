from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)
# Load the summarization pipeline
summarizer = pipeline("summarization")

# Endpoint for text summarization
@app.route("/summarize", methods=["POST"])
def summarize():
    print('-------------why--------',request)
    data = request.get_json()
    text = data.get("text")

    if text:
        # Perform summarization using the Hugging Face pipeline
        summary = summarizer(text)

        # Return the summary
        return jsonify({"summary": summary[0]["summary_text"]})

    return jsonify({"error": "Invalid request"})

if __name__ == "__main__":
    app.run()


