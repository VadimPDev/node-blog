const $posts = document.querySelector('#posts')
const csrf = document.getElementsByName('csrf-token')[0].getAttribute('content')

if($posts){
    $posts.addEventListener('click',event=>{
        if(event.target.classList.contains('js-remove')){
            const id = event.target.dataset.id
            axios({
                method:'delete',
                url:'/posts/remove/'+id,
                headers:{
                    'X-XSRF-TOKEN': csrf
                }
            }).then(res => {
                if(res.data[0] === 'success'){
                    setTimeout(()=>{
                        document.location.href = '/posts'
                    },1500)
                }else {
        
                }
            })
                
        }
    })
}