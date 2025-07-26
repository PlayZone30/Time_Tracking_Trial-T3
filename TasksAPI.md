***

# **Task**

This section details the endpoints for creating and managing tasks within your projects.

### **Authorization**

All requests in this section require a **Bearer Token**.

---

## **Add Task**

Creates a new task in your organization.

<br>

`POST` `https://app.insightful.io/api/v1/task`

### **Request Parameters**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | required | The name of the task. |
| `description` | string | optional | The description of the task. |
| `employees[]` | string | required | The IDs of employees you want to assign to the task. |
| `projectId` | string | required | The ID of the project the task belongs to. |
| `deadline` | number | optional | Date in milliseconds when the task must be done. |
| `status` | string | optional | The current status of the task. |
| `labels[]` | string | optional | Task labels. |
| `priority` | string | optional | Priority of the task. |
| `billable` | boolean | optional | Is the task billable or not. |

### **Headers**

| Key | Value |
| :--- | :--- |
| `Content-Type` | `application/json` |

### **Body**

```json
{
	"name": "",
    "projectId": "",
    "employees": [],
    "description" : "",
    "status": "",
    "billable": false,
    "payroll": {
    	 "billRate": 0,
		 "overtimeBillRate": 0
    }
}
```

---

### **Example Request**

```python
import requests
import json

url = "https://app.insightful.io/api/v1/task"

payload = json.dumps({
  "name": "Your task name",
  "projectId": "wiotv0ilptz9uqg",
  "employees": [
    "wk59h7b0cq8b1oq"
  ],
  "description": "Your task description",
  "status": "To Do",
  "billable": True,
  "payroll": {
    "billRate": 1,
    "overtimeBillRate": 1
  }
})

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```

### **Example Response (Success)**

**Status:** `201 Created`

```json
{
  "id": "ww6sybfoyylxrap",
  "status": "To Do",
  "priority": "low",
  "billable": true,
  "name": "Your task name",
  "projectId": "wiotv0ilptz9uqg",
  "employees": [
    "wk59h7b0cq8b1oq"
  ],
  "description": "Your task description",
  "creatorId": "wuiz-yuxbtr9aul",
  "organizationId": "wbtmikjuiimvh3z",
  "teams": [
    "wautlmuhdnndn7f"
  ],
  "createdAt": 1592927491659
}
```

### **Example Response (Project Not Found)**

**Status:** `404 Not Found`

```json
{
  "type": "EntityNotFound",
  "message": "Project doesn't exist."
}
```

---

## **Get Task**

Fetches a task by its provided ID.

<br>

`GET` `https://app.insightful.io/api/v1/task/:id`

### **Path Variables**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | string | required | The unique identifier of the task. |

### **Example Request**

```python
import requests

url = "https://app.insightful.io/api/v1/task/w-4xfzgjiv-8jn8"

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE'
}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

### **Example Response**

**Status:** `200 OK`

```json
{
  "id": "w-4xfzgjiv-8jn8",
  "status": "To Do",
  "priority": "low",
  "billable": true,
  "name": "Your task name 2",
  "projectId": "wiotv0ilptz9uqg",
  "employees": [
    "wk59h7b0cq8b1oq"
  ],
  "description": "Your task description 2",
  "creatorId": "wuiz-yuxbtr9aul",
  "organizationId": "wbtmikjuiimvh3z",
  "teams": [
    "wautlmuhdnndn7f"
  ],
  "createdAt": 1592927582955
}
```

---

## **Find Tasks**

Retrieves a list of all tasks in your organization.

<br>

`GET` `https://app.insightful.io/api/v1/task`

### **Example Request**

```python
import requests

url = "https://app.insightful.io/api/v1/task"

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE'
}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

### **Example Response**

**Status:** `200 OK`

The response will be a JSON array of task objects.

---

## **Update Task**

Performs an update on a task specified by ID and retrieves the task object after a successful update.

<br>

`PUT` `https://app.insightful.io/api/v1/task/:id`

### **Path Variables**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | string | required | The unique identifier of the task to update. |

### **Request Parameters**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | optional | The new name of the task. |
| `description` | string | optional | The new description of the task. |
| `employees[]` | string | optional | The new list of employee IDs assigned to the task. |
| `deadline` | number | optional | New date in milliseconds for the task deadline. |
| `status` | string | optional | The new status of the task. |
| `labels[]` | string | optional | New task labels. |
| `priority` | string | optional | New priority of the task. |
| `billable` | boolean | optional | Is the task billable or not. |

### **Headers**

| Key | Value |
| :--- | :--- |
| `Content-Type` | `application/json` |

### **Body**

```json
{
	"name": "",
    "employees": [],
    "description" : "",
    "status": "",
    "billable": false,
    "deadline": 0
}
```

---

### **Example Request**

```python
import requests
import json

url = "https://app.insightful.io/api/v1/task/ww6sybfoyylxrap"

payload = json.dumps({
  "name": "Your task new name",
  "employees": [
    "wk59h7b0cq8b1oq"
  ]
})
headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE',
  'Content-Type': 'application/json'
}

response = requests.request("PUT", url, headers=headers, data=payload)

print(response.text)
```

### **Example Response**

**Status:** `200 OK`

```json
{
  "id": "ww6sybfoyylxrap",
  "status": "To Do",
  "priority": "low",
  "billable": true,
  "name": "Your task new name",
  "projectId": "wiotv0ilptz9uqg",
  "employees": [
    "wk59h7b0cq8b1oq"
  ],
  "description": "Your task description",
  "creatorId": "wuiz-yuxbtr9aul",
  "organizationId": "wbtmikjuiimvh3z",
  "teams": [
    "wautlmuhdnndn7f"
  ],
  "createdAt": 1592927491659
}
```

---

## **Delete Task**

Deletes a task by its provided ID.

<br>

`DELETE` `https://app.insightful.io/api/v1/task/:id`

### **Path Variables**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | string | required | The unique identifier of the task to delete. |

### **Example Request**

```python
import requests

url = "https://app.insightful.io/api/v1/task/w-4xfzgjiv-8jn8"

headers = {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
}

response = requests.request("DELETE", url, headers=headers)

print(response.text)
```

### **Example Response**

**Status:** `200 OK`

The response body contains the details of the task that was just deleted.

```json
{
  "id": "w-4xfzgjiv-8jn8",
  "status": "To Do",
  "priority": "low",
  "billable": true,
  "name": "Your task name 2",
  "projectId": "wiotv0ilptz9uqg",
  "employees": [
    "wk59h7b0cq8b1oq"
  ],
  "description": "Your task description 2",
  "creatorId": "wuiz-yuxbtr9aul",
  "organizationId": "wbtmikjuiimvh3z",
  "teams": [
    "wautlmuhdnndn7f"
  ],
  "createdAt": 1592927582955
}
```