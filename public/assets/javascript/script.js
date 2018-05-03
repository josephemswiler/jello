(function () {
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
        let p = $('<p>')
            .addClass('open-card')
            .attr('contenteditable', 'true');
        let content = $('<div>')
            .addClass('card-content')
            .append(p)
        let div = $('<div>')
            .addClass('card inner-card')
            .append(content)
        let close = $('<i>')
            .addClass('fas fa-times')
        let button = $('<button>')
            .addClass('open-card-btn waves-effect waves-light btn green darken-1 white-text')
            .text('Add')
        let wrapper = $('<div>')
            .append(div)
            .append(button, close)

        $('.card-data').append(wrapper)
        $('.open-card').focus().select()
    })

    

    $(document).on('click', '.open-card-btn', function () {
        console.log($('.open-card').text())

        $(this).remove()
        $('.fa-times').remove()
        
        $('.open-card')
            .attr('contenteditable', 'false');
    })


})() //IIFE