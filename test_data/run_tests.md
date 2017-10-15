##Tests to run

**General**
GET: http://localhost:8080/api/

**DashContents**
GET: http://localhost:8080/api/cont/getall
{
    x-access-token: ...
}
GET: http://localhost:8080/api/cont/get?id=1
{
    x-access-token: ...
}

**Users**
GET: http://localhost:8080/api/user/get/
{
    x-access-token: ...
}
POST: http://localhost:8080/api/user/add
{
    user_id:frankchu
    email:fc@gmail.com
    password:password
}
PUT: http://localhost:8080/api/user/login
{
    user_id:frankchu
    password:password
}