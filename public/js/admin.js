const form = document.querySelector('#post')
const edit = document.querySelector('#edit')
const csrf = document.querySelector('#csrf').dataset.csrf

if(form){
    form.addEventListener('submit',event=>{
        event.preventDefault()
        const data = new FormData(form)
    
        axios({
            method:'POST',
            url:'/posts/create',
            headers:{
                'X-XSRF-TOKEN': csrf
            },
            data:data
        }).then(response => {
            if(response.data[0] === 'success'){
                setTimeout(()=>{
                    document.location.href = '/'
                },1500)
            }else {
    
            }
        })
    })
}

if(edit){
    edit.addEventListener('submit',event=>{
        event.preventDefault()
        const data = new FormData(edit)
        const id = document.querySelector('#title').dataset.id
    
        axios({
            method:'POST',
            url:`/posts/edit/${id}`,
            headers:{
                'X-XSRF-TOKEN': csrf
            },
            data:data
        }).then(response => {
            if(response.data[0] === 'success'){
                setTimeout(()=>{
                    document.location.href = '/'
                },1500)
            }else {
    
            }
        })
    })
}


