export default [

    {
        id : 1,
        title : "Main Board",
        deletable : false,
        cards : [
            {
                id : 1,
                title : "Main List",
                deletable : false,
                tasks : [
                    {
                        id : 1,
                        title: "Do Taxes",
                        description: "File my taxes",
                        active: true
                    }
                ]
            }, 
            {
                id : 2,
                title : "Chores",
                deletable: true,
                tasks : []
            }
        ]
    },
    {
        id : 2,
        title : "School Work",
        deletable : true,
        cards : [
            {
                id : 1,
                title : "Main List",
                deletable : false,
                tasks : []
            }, 
            {
                id : 2,
                title : "English Assignments",
                deletable: true,
                tasks : []
            },
            {
                id : 3,
                title : "Math Assigments",
                deletable: true,
                tasks : []
            }
        ]
    }
]