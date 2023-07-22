from transformers import T5Tokenizer, T5ForConditionalGeneration
from flask import  Flask,request,jsonify
from flask_cors import CORS,cross_origin
import time

def summarization_infer(text, max=50):
  preprocess_text = text.replace("\n", " ").strip()
  t5_prepared_Text = "summarize: "+preprocess_text
  tokenized_text = tokenizer.encode(t5_prepared_Text, return_tensors="pt")

  summary_ids = model.generate(tokenized_text, min_length=30, max_length=max, top_k=100, top_p=0.8) #top-k top-p sampling strategy
  output = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
  end_time = time.time()
  print (f'Time taken : {end_time-start_time}')
  return output

def translation_infer(text, max=50):
  preprocess_text = text.replace("\n", " ").strip()
  t5_prepared_Text = "translate English to German: "+preprocess_text
  tokenized_text = tokenizer.encode(t5_prepared_Text, return_tensors="pt")

  translation_ids = model.generate(tokenized_text, min_length=10, max_length=50, early_stopping=True, num_beams=2)
  output = tokenizer.decode(translation_ids[0], skip_special_tokens=True)
  end_time = time.time()
  print (f'Time taken : {end_time-start_time}')
  return output

def grammatical_acceptibility_infer(text):
  preprocess_text = text.replace("\n", " ").strip()
  t5_prepared_Text = "cola sentence: "+preprocess_text
  tokenized_text = tokenizer.encode(t5_prepared_Text, return_tensors="pt")

  grammar_ids = model.generate(tokenized_text, min_length=1, max_length=3)
  output = tokenizer.decode(grammar_ids[0], skip_special_tokens=True)
  end_time = time.time()
  print (f'Time taken : {end_time-start_time}')
  return output

app = Flask(__name__)

@app.route('/sum',methods=['POST'])
@cross_origin(origin='*')
def infer():
    # text = request.args['text']
    # args = request.args['task']
    a = request.get_json(force=True)
    text = a["text"]
    task = a['task']
    if task == 'summarize':
        return jsonify({"summary":summarization_infer(text)})
       
    elif task == 'translation':
        return jsonify({"summary":translation_infer(text)})
    
    else:
        return grammatical_acceptibility_infer(text)


if __name__=="__main__":
    model = T5ForConditionalGeneration.from_pretrained('t5-small')
    tokenizer = T5Tokenizer.from_pretrained('t5-small')
    start_time = time.time()
    app.run(port=5001)

