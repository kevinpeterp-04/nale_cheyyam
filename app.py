from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# In a real app, you'd use a database
tasks = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/tasks', methods=['GET', 'POST'])
def handle_tasks():
    if request.method == 'POST':
        task_data = request.json
        # Apply chaos logic here
        tasks.append(task_data)
        return jsonify({"status": "success", "task": task_data})
    else:
        return jsonify(tasks)

@app.route('/api/stats')
def get_stats():
    # Return fake stats
    return jsonify({
        "tasks_ignored": len([t for t in tasks if t.get('deleted')]),
        "procrastination_level": f"{min(95, len(tasks) * 10)}%",
        "time_wasted": f"{len(tasks) * 5} mins"
    })

if __name__ == '__main__':
    app.run(debug=True)