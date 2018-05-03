(function () {
    console.log('hello world')

    let cards = []


    //dynamically set max-height of list based on window size
    function setHeight() {
        let innerHeight = $(window).height() - 200
        $('.card-data').css('max-height', innerHeight)
    }
    $(document).ready(setHeight())

    $(window).resize(function () {
        setHeight()
    })

    //materialize responsive elements
    $('.sidenav').sidenav()
    $('.tooltipped').tooltip()

    $('.add-card-btn-wrapper').hover(function () {
        $(this)
            .toggleClass('lighten-3 lighten-1 underlined')
    })

    

    $(document).on('click', '.add-card-btn', function () {
        console.log('hello')
    })


})() //IIFE