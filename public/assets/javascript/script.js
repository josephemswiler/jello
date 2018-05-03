(function () {
    //dynamically set max-height of list based on window size
    let addingCard = false

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
            .toggleClass('lighten-3 lighten-2 underlined')
    })

    $(document).on('click', '.add-card-btn', function () {
        if (addingCard)
            return

        $('.card-data').animate({
            scrollTop: $('.card-data').prop('scrollHeight')
        }, 1000)

        addingCard = true

        let p = $('<p>')
            .addClass('open-card')
            .attr('contenteditable', 'true')
        let content = $('<div>')
            .addClass('card-content')
            .append(p)
        let div = $('<div>')
            .addClass('card inner-card')
            .append(content)
        let close = $('<i>')
            .addClass('fas fa-times close-open-card close-card-wrapper')
        let button = $('<button>')
            .addClass('open-card-btn waves-effect waves-light btn green darken-1 white-text')
            .text('Add')
        let wrapper = $('<div>')
            .addClass('inner-card-wrapper')
            .append(div)
            .append(button, close)

        $('.card-data').append(wrapper)
        $('.open-card').focus().select()
    })

    $(document).on('click', '.close-card-wrapper', function () {
        $(this).closest('.inner-card-wrapper').remove()

        addingCard = false
    })

    $(document).on('click', '.open-card-btn', function () {
        if ($('.open-card').text().trim() === '' && $(this).text() === 'Add')
            return

        if ($('.open-card').text().trim() === '' && $(this).text() === 'Done')
            $(this).closest('.inner-card-wrapper').remove()

        $(this).remove()
        $('.close-open-card').remove()

        let close = $('<i>')
            .addClass('fas fa-times small-close hover-options close-card-wrapper')

        let edit = $('<i>')
            .addClass('fas fa-edit hover-options')

        $('.open-card p br').remove()
        $('.open-card div br').remove()

        $('.open-card')
            .addClass('closed-card')
            .removeClass('open-card')
            .attr('contenteditable', 'false')
            .append(edit, close)

        addingCard = false
    })

    $(document).on('click', '.fa-edit', function () {
        addingCard = true

        let button = $('<button>')
            .addClass('open-card-btn waves-effect waves-light btn green darken-1 white-text')
            .text('Done')

        let close = $('<i>')
            .addClass('fas fa-times close-open-card close-card-wrapper')

        $('.hover-options').hide()

        $(this)
            .parent()
            .removeClass('closed-card')
            .addClass('open-card')

        $(this)
            .parent()
            .attr('contenteditable', 'true')
            .focus()
            .select()

        $(this)
            .closest('.inner-card-wrapper')
            .append(button, close)

    })

    $(document).on('mouseenter', '.closed-card', function () {
        $(this)
            .children('.hover-options')
            .show()

    })

    $(document).on('mouseleave', '.closed-card', function () {
        $(this)
            .children('.hover-options')
            .hide()
    })

    $(document).on('mouseenter', '.ellipsis-btn', function () {
        $(this)
            .removeClass('lighten-3')
            .addClass('lighten-2')

    })

    $(document).on('mouseleave', '.ellipsis-btn', function () {
        $(this)
            .addClass('lighten-3')
            .removeClass('lighten-2')
    })


    $(document).on('click', '.ellipsis-btn', function () {

    })


})() //IIFE