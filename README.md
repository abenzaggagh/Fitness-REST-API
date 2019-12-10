# Fitness REST API

## Users

***Show Users or Add a new User***
----
Returns json data about a all users or the new added user.

* **URL**
/api/users

* **Method:**
`GET` | `POST`

* **URL Params**

    **Required:**
    `firstName=[String]`
    `lastName=[String]`
    `gender=[String]`
    `birthday=[Date]`
    `email=[String]`
    `password=[String]`

***Show, Update or Delete a User***
----
Returns json data about the new or updated user or message if the user has been deleted.

* **URL**
/api/users/:userID

* **Method:**
`GET` | `PUT` | `DELETE`


