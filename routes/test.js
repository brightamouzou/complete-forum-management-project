let a=[{a:15, b:"azertyu"},{a:5, b:"azertyu"},{a:18, b:"azertyu"}]
    

for(let i=1; i<a.length; i++){
    k=a[i]
    j=i

    while(j>0 && a[j-1].a<k.a){
        a[j]=a[j-1]
        j--
    }

    a[j]=k


}

console.log(a);



let forumsClone=[
    {

      name: 'bab',
      description: 'bab\r\n                        ',
      isBoolenQuestion: false,
      createdAt: "2021-10-30T17:50:17.425Z",
      updatedAt: "2021-10-30T17:50:17.425Z",
      __v: 0
    },
    {

      name: 'bab1',
      description: 'bab1\r\n                        ',
      isBoolenQuestion: false,
      createdAt: "2021-10-30T17:52:45.175Z",
      updatedAt: "2021-10-30T17:52:45.175Z",
      __v: 0
    },
    {
      name: 'bab2',
      description: 'bab2\r\n                        ',
      isBoolenQuestion: false,
      createdAt: "2021-10-30T17:55:39.366Z",
      updatedAt: "2021-10-30T17:55:39.366Z",
      __v: 0
    },
    {

      name: 'bab3',
      description: 'bab3\r\n            ',
      isBoolenQuestion: false,
      createdAt: "2021-10-30T17:58:29.028Z",
      updatedAt: "2021-10-30T17:58:29.028Z",
      __v: 0
    },
    {

      name: 'Les choses commencent enfin',
      description: 'Comment allez vous?\r\n                        ',
      isBoolenQuestion: false,
      createdAt: "2021-10-31T22:11:39.920Z",
      updatedAt: "2021-10-31T22:11:39.920Z",
      __v: 0
    }
  ]


function formatDate(a){
    return new Date(a).getTime()
}

forumsClone.forEach(ele=>{
    console.log(formatDate(ele.createdAt));
})

for(let i=1; i<forumsClone.length; i++){
    k=forumsClone[i]
    j=i

    console.log(formatDate(forumsClone[j-1].createdAt));

    while(j>0 && formatDate(forumsClone[j-1].createdAt)<formatDate(k.createdAt)){
        forumsClone[j]=forumsClone[j-1]
        j--
    }

    forumsClone[j]=k
    

}

console.log(forumsClone);