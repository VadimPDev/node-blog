const form = document.querySelector('#post')
const csrf = document.querySelector('#csrf').dataset.csrf

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
