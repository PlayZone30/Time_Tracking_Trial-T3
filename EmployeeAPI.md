
***

# **Employee**

You can use the employee collection for employee management in your organization.

### **Authorization**

This collection uses a **Bearer Token**.

---

## **Invite Employee**

Creates a new employee and returns an employee object.

<br>

`POST` `https://app.insightful.io/api/v1/employee`

### **Request Parameters**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | required | The name of the employee which will be shown in the application. |
| `email` | string | required | The email of the employee. |
| `teamId` | string | required | The ID of the team to whom the employee belongs. |
| `sharedSettingsId`| string | required | The ID of shared settings which will be applied to the employee. |

### **Headers**

| Key | Value |
| :--- | :--- |
| `Content-Type` | `application/json` |

### **Body**

```json
{
	"name": "",
	"email": "",
	"teamId": "",
	"sharedSettingsId": ""
}
```

---

### **Example Request**

```python
import requests
import json

url = "https://app.insightful.io/api/v1/employee"

payload = json.dumps({
  "name": "Employee 4",
  "email": "employee4@gmial.com",
  "teamId": "wautlmuhdnndn7f",
  "sharedSettingsId": "waufhwfhb0p41mr"
})

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```

### **Example Response**

**Status:** `200 OK`

**Body:**

```json
{
  "id": "wf8rsovxa8vjq8w",
  "name": "Employee 4",
  "email": "employee4@gmial.com",
  "teamId": "wautlmuhdnndn7f",
  "sharedSettingsId": "waufhwfhb0p41mr",
  "accountId": "wmwrbaurf3xddu5",
  "identifier": "employee4@gmial.com",
  "type": "personal",
  "organizationId": "wbtmikjuiimvh3z",
  "projects": [],
  "deactivated": 0,
  "invited": 1592922679686,
  "createdAt": 1592922679689
}
```

**Headers:**

| Key | Value |
| :--- | :--- |
| `X-DNS-Prefetch-Control` | `off` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Strict-Transport-Security` | `max-age=15552000; includeSubDomains` |
| `X-Download-Options` | `noopen` |
| `X-Content-Type-Options`| `nosniff` |
| `X-XSS-Protection` | `1; mode=block` |
| `Content-Type` | `application/json; charset=utf-8` |
| `Date` | `Tue, 23 Jun 2020 14:31:19 GMT` |
| `Connection` | `keep-alive` |
| `Content-Length` | `336` |

---

## **Get Employee**

Fetches an employee by their provided ID.

<br>

`GET` `https://app.insightful.io/api/v1/employee/:id`

### **Path Variables**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | string | required | The unique identifier of the employee. |

### **Example Request**

```python
import requests

url = "https://app.insightful.io/api/v1/employee/wspxwyl3mzilfz5"

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
  "id": "wspxwyl3mzilfz5",
  "email": "employee23@gmail.com",
  "name": "John Doe",
  "teamId": "wautlmuhdnndn7f",
  "sharedSettingsId": "waufhwfhb0p41mr",
  "accountId": "wtl6qh6ygxbinqj",
  "identifier": "employee23@gmail.com",
  "type": "personal",
  "organizationId": "wbtmikjuiimvh3z",
  "projects": [],
  "deactivated": 0,
  "invited": 1592850492316,
  "createdAt": 1592850492318
}
```

---

## **List Employees**

Retrieves a list of all employees in your organization.

<br>

`GET` `https://app.insightful.io/api/v1/employee`

### **Query Parameters**

| Key | Format | Description |
| :--- | :--- | :--- |
| `select` | string | Optional. A comma-separated list of columns to return. Example: `_id,name,email`. |

### **Example Request**

```python
import requests

url = "https://app.insightful.io/api/v1/employee"

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE'
}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

### **Example Response**

**Status:** `200 OK`

```json
[
  {
    "id": "wk59h7b0cq8b1oq",
    "email": "vxcvxcv@gmail.com",
    "name": "Employee 2",
    "teamId": "wautlmuhdnndn7f",
    "sharedSettingsId": "waufhwfhb0p41mr",
    "accountId": "wiorozokbvlgxgw",
    "identifier": "vxcvxcv@gmail.com",
    "type": "personal",
    "organizationId": "wbtmikjuiimvh3z",
    "projects": [
      "wguwpw8-o6rdcfn",
      "wdewmdv6xkfryrb"
    ],
    "deactivated": 1592853287525,
    "invited": 1592568754375,
    "createdAt": 1592568754382
  },
  {
    "id": "w8jt496hid4shz3",
    "email": "employee1@gmail.com",
    "name": "employee1",
    "teamId": "wautlmuhdnndn7f",
    "sharedSettingsId": "waufhwfhb0p41mr",
    "accountId": "wsvfvfbuo7hwxo4",
    "identifier": "employee1@gmail.com",
    "type": "personal",
    "organizationId": "wbtmikjuiimvh3z",
    "projects": [
      "wguwpw8-o6rdcfn",
      "wdewmdv6xkfryrb"
    ],
    "deactivated": 0,
    "invited": 0,
    "createdAt": 1592809199202
  }
]
```

---

## **Update Employee**

Performs an update on an employee specified by ID and retrieves the employee object after a successful update.

<br>

`PUT` `https://app.insightful.io/api/v1/employee/:id`

### **Path Variables**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | string | required | The unique identifier of the employee. |

### **Request Parameters**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | optional | The new name of the employee. |
| `email` | string | optional | The new email of the employee. |
| `title` | string | optional | The new job title of the employee. |
| `teamId` | string | optional | The ID of the team to which the employee will belong after the update. |
| `sharedSettingsId` | string | optional | The ID of shared settings to be applied to the employee after the update. |
| `projects[]` | string | optional | The IDs of projects you want an employee to belong to. |

### **Example Request**

```python
import requests
import json

url = "https://app.insightful.io/api/v1/employee/wspxwyl3mzilfz5"

payload = json.dumps({
  "name": "John Doe",
  "email": "john.doe@gmail.com",
  "teamId": "wautlmuhdnndn7f",
  "title": "HR",
  "sharedSettingsId": "waufhwfhb0p41mr",
  "projects": []
})

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE',
  'Content-Type': 'application/json'
}

response = requests.request("PUT", url, headers=headers, data=payload)

print(response.text)
```

### **Example Response (Success)**

**Status:** `200 OK`

```json
{
  "id": "wspxwyl3mzilfz5",
  "email": "john.doe@gmail.com",
  "name": "John Doe",
  "teamId": "wautlmuhdnndn7f",
  "sharedSettingsId": "waufhwfhb0p41mr",
  "accountId": "wtl6qh6ygxbinqj",
  "identifier": "employee23@gmail.com",
  "type": "personal",
  "organizationId": "wbtmikjuiimvh3z",
  "projects": [],
  "deactivated": 0,
  "invited": 1592850492316,
  "createdAt": 1592850492318
}
```

### **Example Response (Not Found)**

**Status:** `404 Not Found`

```json
{
  "type": "NOT_FOUND",
  "message": "Not found"
}
```

---

## **Deactivate Employee**

Deactivates an employee by their provided ID.

<br>

`GET` `https://app.insightful.io/api/v1/employee/deactivate/:id`

### **Path Variables**

| Key | Format | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | string | required | The unique identifier of the employee to deactivate. |

### **Example Request**

```python
import requests

url = "https://app.insightful.io/api/v1/employee/deactivate/wk59h7b0cq8b1oq"

headers = {
  'Authorization': 'Bearer YOUR_TOKEN_HERE'
}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

### **Example Response (Success)**

**Status:** `200 OK`

```json
{
  "id": "wk59h7b0cq8b1oq",
  "email": "vxcvxcv@gmail.com",
  "name": "vxcvxcv",
  "teamId": "wautlmuhdnndn7f",
  "sharedSettingsId": "waufhwfhb0p41mr",
  "accountId": "wiorozokbvlgxgw",
  "identifier": "vxcvxcv@gmail.com",
  "type": "personal",
  "organizationId": "wbtmikjuiimvh3z",
  "projects": [],
  "deactivated": 1592853287525,
  "invited": 1592568754375,
  "createdAt": 1592568754382
}
```

### **Example Response (Already Deactivated)**

**Status:** `400 Bad Request`

```json
{
  "message": "Employee is already deactivated"
}
```