
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)
DB = "vaxter.db"

def funktiondatabas():
    conn = sqlite3.connect(DB)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS matningar (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            vaxt_id   TEXT    NOT NULL,
            tid       TEXT    NOT NULL,
            fuktvarde REAL    NOT NULL
        )
    """)
    conn.commit()
    conn.close()

@app.route("/skicka", methods=["POST"])
def taemot():
    data = request.get_json()
    vaxt_id   = data["vaxt_id"]
    fuktvarde = data["fuktvarde"]
    tid       = datetime.now().isoformat()

    conn = sqlite3.connect(DB)
    conn.execute(
        "INSERT INTO matningar (vaxt_id, tid, fuktvarde) VALUES (?, ?, ?)",
        (vaxt_id, tid, fuktvarde)
    )
    conn.commit()
    conn.close()

    return jsonify({"status": "ok"}), 200

@app.route("/status", methods=["GET"])
def statuss():
    conn = sqlite3.connect(DB)
    rader = conn.execute("""
        SELECT vaxt_id, tid, fuktvarde
        FROM matningar
        WHERE id IN (
            SELECT MAX(id) FROM matningar GROUP BY vaxt_id
        )
    """).fetchall()
    conn.close()

    result = [
        {"vaxt_id": r[0], "tid": r[1], "fuktvarde": r[2]}
        for r in rader
    ]
    return jsonify(result), 200

if __name__ == "__main__":
    funktiondatabas()
    app.run(debug=True, port=5000)