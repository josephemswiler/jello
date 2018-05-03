(function() {
    console.log('hello world')

    $('.sidenav').sidenav()

    $('.tooltipped').tooltip()

    $('.add-card-btn-wrapper').hover(function() {
        $( this )
          .toggleClass('lighten-3 lighten-1 underlined')
    })

})() //IIFE