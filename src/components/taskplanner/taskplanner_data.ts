
// временные данные

export const data = {
  schema:[
    {
      "name":"user",
      "coord":{x: 88, y:20},
      "att":[
        {"name":"ID","type":"int","null":false,"pk":true},
        {"name":"Name","type":"vchar(50)","null":false,"pk":false},
        {"name":"Email","type":"vchar(50)","null":false,"pk":false},
        {"name":"Password","type":"vchar(50)","null":false,"pk":false}
      ]
    },
    {
      "name":"todo",
      "coord":{x:1017, y:8},
      "att":[
        {"name":"ID","type":"int","null":false,"pk":true},
        {"name":"Name","type":"vchar(50)","null":false,"pk":false},
        {"name":"Email","type":"vchar(50)","null":false,"pk":false},
        {"name":"Password","type":"vchar(50)","null":false,"pk":false}
      ]
    },
    {
      "name":"any",
      "coord":{x:582, y:410},
      "att":[
        {"name":"ID","type":"int","null":false,"pk":true},
        {"name":"Name","type":"vchar(50)","null":false,"pk":false},
        {"name":"Email","type":"vchar(50)","null":false,"pk":false},
        {"name":"Password","type":"vchar(50)","null":false,"pk":false}
      ]
    },
  ],
  rel:[
    {"head":'user.ID',"tail":"todo.ID"},
    {"head":'any.ID',"tail":"user.ID"},

  ]
}

