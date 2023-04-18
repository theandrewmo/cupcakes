$(function(){

    const BASE_URL = '/api/cupcakes';

    async function getCupcakes(){
        try {
        const response = await axios.get(`${BASE_URL}`)
        RenderCupcakes(response.data)
        $('.container').removeClass('hidden')
        }
        catch(e) {
            console.log(e)
        }   
    }

    function RenderCupcakes(data) {
        $('.cupcakes').empty()
        Object.entries(data.cupcakes).forEach(function([key,value]) {
           $('.cupcakes').append(
            `<div class="${value.id}">
             <li>${value.flavor} / ${value.size} / ${value.rating}</li>
             <button class='btn btn-danger'> delete </button>
             <img src='${value.image}' alt='no image' style='height:100px; width: 100px;'>
             </div>
           `)
        })
    }

    getCupcakes()
    
    $('form').on('submit', async function(e) {
        e.preventDefault()
        let flavor = $('#flavor').val()
        let size = $('#size').val()
        let rating = $('#rating').val()
        let image = $('#image').val()

        const addCupcake = await axios.post(`${BASE_URL}`,
        {
          flavor,
          rating,
          size,
          image  
        })
        getCupcakes()
    })

   $('.cupcakes').on('click','button',async function() {
       try {
        await axios.delete(`${BASE_URL}/${$(this).parent().attr('class')}`)
        getCupcakes()
        } 
        catch(e) {
        console.log(e)
        }
   })

})

