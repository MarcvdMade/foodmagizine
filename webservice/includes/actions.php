<?php
/**
 * @return array
 */

function getDishes()
{
    return [
        [
            "id" => 1,
            "name" => "Pizza",
            "kitchen" => "Italian",
        ],
        [
            "id" => 2,
            "name" => "Kale",
            "kitchen" => "Dutch",
        ],
        [
            "id" => 3,
            "name" => "Lasagna",
            "kitchen" => "Italian",
        ],
        [
            "id" => 4,
            "name" => "Kebab",
            "kitchen" => "Turkish",
        ],
        [
            "id" => 5,
            "name" => "Paella",
            "kitchen" => "Spanish",
        ],
        [
            "id" => 6,
            "name" => "Brownie",
            "kitchen" => "American",
        ],
        [
            "id" => 7,
            "name" => "Pancake",
            "kitchen" => "A lot of countrys",
        ],
        [
            "id" => 8,
            "name" => "Cheese",
            "kitchen" => "Dutch",
        ],
        [
            "id" => 9,
            "name" => "beer",
            "kitchen" => "Different countrys",
        ]
    ];
}

/**
 * @param $id
 * @return mixed
 */

function getDishDetails($id)
{
    $tags = [
        1 => [
            "recipe" => "Put it in the oven and go!",
            "tags" => ['cheese', 'oven']
        ],
        2 => [
            "recipe" => "You can make this delicious Dutch meal by ...",
            "tags" => ['unox', 'healthy', 'stamppot']
        ],
        3 => [
            "recipe" => "Very nice when your grandma prepares this meal",
            "tags" => ['omnomnom']
        ],
        4 => [
            "recipe" => "Everytime in the city after midnight",
            "tags" => ['kapsalon', 'tasty', 'meat']
        ],
        5 => [
            "recipe" => "Specialty when on holiday in Spain",
            "tags" => ['fish']
        ],
        6 => [
            "recipe" => "A lot of chocolate",
            "tags" => ['unhealty, chocolate']
        ],
        7 => [
            "recipe" => "Cool for doing pancake flips",
            "tags" => ['delicious, awesome, so flat as a pancake']
        ],
        8 => [
            "recipe" => "moooooowww",
            "tags" => ['cheesy']
        ],
        9 => [
            "recipe" => "Dont drive if drunk!",
            "tags" => ['alcholic, drunk']
        ]
    ];

    return $tags[$id];
}
