# app.py
from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# In-memory "database" for tasks
tasks_db = [
    {"id": 1, "text": "Plan world domination", "priority": "Eventually"},
    {"id": 2, "text": "Learn interpretive dance", "priority": "Maybe Tomorrow"},
    {"id": 3, "text": "Stare at the ceiling", "priority": "High-ish"}
]
next_id = 4

# More chaos for the Task Mutator Engine
CHAOS_NAMES = [
    "Daydream about being a successful YouTuber",
    "Watch productivity videos instead of working",
    "Make a to-do list for making a to-do list",
    "Contemplate the fleeting nature of existence",
    "Research the world's most comfortable chair",
    "Organize snacks by color",
    "Find the perfect GIF for a 3-day-old conversation",
    "Alphabetize your spice rack, you know, for 'efficiency'",
    "Figure out what the dog is thinking",
    "Fall down a Wikipedia rabbit hole about historical hats"
]
CHAOS_PRIORITIES = ["High-ish", "Eventually", "Why bother?", "ASAP (As Soon As Possible... Maybe)", "Top Secret", "When the stars align"]

@app.route('/')
def index():
    """Renders the main HTML page."""
    return render_template('index.html')

# --- API Routes for Tasks ---

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    """Returns the current list of tasks."""
    return jsonify(tasks_db)

@app.route('/api/tasks', methods=['POST'])
def add_task():
    """Adds a new task and gives it a chaotic priority."""
    global next_id
    data = request.json
    new_task = {
        "id": next_id,
        "text": data.get('text', 'Untitled procrastination'),
        "priority": random.choice(CHAOS_PRIORITIES)
    }
    tasks_db.append(new_task)
    next_id += 1
    return jsonify(new_task), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def mutate_task(task_id):
    """Finds a task and mutates its name and priority."""
    task = next((t for t in tasks_db if t['id'] == task_id), None)
    if task:
        task['text'] = random.choice(CHAOS_NAMES)
        task['priority'] = random.choice(CHAOS_PRIORITIES)
        return jsonify(task)
    return jsonify({"error": "Task not found"}), 404

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Deletes a task from the list."""
    global tasks_db
    initial_len = len(tasks_db)
    tasks_db = [t for t in tasks_db if t['id'] != task_id]
    if len(tasks_db) < initial_len:
        return jsonify({"success": True}), 200
    return jsonify({"error": "Task not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)