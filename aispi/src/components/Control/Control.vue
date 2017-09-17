<template lang="jade">
    div.page__wrap
        div#header AISPI Event Control Panel
        div.main__divider
        div.main__list
            div.list__header Upcoming Events
</template>

<style scoped>
    body {
        text-align: center;
    }
    .page__wrap{
        width: 1000px;
        margin: auto;
    }
        .main__divider{
            width: 60%;
            margin: auto;
            height: 4px;
            background-color: #DDD;
            border-radius: 5px;
            margin-bottom: 40px;
        }
        #header {
            font-family: Montserrat;
            font-size: 24px;
            font-weight: 100;
            padding: 20px 0;
        }
            .main__list {
                width: 400px;
            }
            .list__header{
                width: 100%;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
</style>