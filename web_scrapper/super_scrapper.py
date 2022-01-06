from flask import Flask, render_template, request, redirect, send_file
from so import get_so_jobs
from indeed import get_indeed_jobs
from save import save_to_file

app = Flask("SuperScrapper")

#4.5fake DB
db = {}


@app.route("/")
def home():
    return render_template("flask.html")

@app.route("/report")
def report():
    # print(request.args)
    word = request.args.get('word')
    if word: 
        word.lower()
        fromDb = db.get(word)
        if fromDb:
            indeed_jobs = fromDb[word]
        else:
            indeed_jobs = get_indeed_jobs(word)
            db[word] = indeed_jobs
        # print(indeed_jobs)
        # so_jobs = get_so_jobs(word)
        
    return render_template("report.html", 
                           searchingBy=word, 
                           resultsNumber = len(indeed_jobs),
                           jobs = indeed_jobs)


#4.7 Export
@app.route("/export")
def export():
    try:
        word = request.args.get('word')
        if not word:
            raise Exception()
        word = word.lower()
        jobs = db.get(word)
        if not jobs:
            Exception()
        save_to_file(jobs)
        return send_file("jobs.csv")
    except:
        return redirect("/")


app.run(host="0.0.0.0")
# app.run(