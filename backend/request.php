<?php
session_start();
/******************************************************************************************************************\
 *File:    request.php                                                                                             *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 8th, 2019                                                                                        *
 *Purpose: This file will handle received request data from the front end                                          *
\******************************************************************************************************************/

require_once('DB/database.php');
require_once('DB/User.php');
require_once('DB/UserDB.php');
require_once('DB/MessageDB.php');

//define the headers to be hit by frontend requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
//get the endpoint requested
$request = $_SERVER['PATH_INFO'];
$post_body = json_decode(file_get_contents('php://input'));
//variable to store more detailed messages to frontend (JSON)
$message = '';
switch ($request) {
    case '/authenticate':
        $email = htmlspecialchars($post_body->email);
        $password = $post_body->password;

        //make sure email and/or password aren't empty before proceeding
        if ($email === "" || $password === "") {
            exit("Missing credentials.");
        } else {
            //customizable message to return to frontend
            $message = '';
            //get user's password from DB and then compare with entered password
            $stored_password = UserDB::get_password($email);
            if (password_verify($password, $stored_password)) {
                $password_matches = true;
                //get user info from DB and then return JSON to frontend with their info (name, email, phone)
                $user_array = UserDB::get_user_info($email);
                $message = json_encode(array('verification' => 'Password verified.', 'user' => $user_array), JSON_PRETTY_PRINT);
                exit($message);
            } else {
                $password_matches = false;
                $message = json_encode(array('verification' => 'Password does not match.'), JSON_PRETTY_PRINT);
                exit($message);
            }
        }

    case '/register':
        $fname = htmlspecialchars($post_body->firstName);
        $lname = htmlspecialchars($post_body->lastName);
        $phone = htmlspecialchars($post_body->phoneNumber);
        $email = htmlspecialchars($post_body->email);
        $password = $post_body->password;

        //set up hash option (salt)
        $option = ['cost' => 13];
        $hash = password_hash($password, PASSWORD_BCRYPT, $option);
        //add user to the RMUsers database
        $user_id = UserDB::add_user($fname, $lname, $phone, $email, $hash);
        $_SESSION['userID'] = $user_id;
        exit('Success');
    case '/contact':
        //get all data from the contact form
        $name = htmlspecialchars($post_body->contactName);
        $email = htmlspecialchars($post_body->contactEmail);
        $message = htmlspecialchars($post_body->contactDescriptionText);

        //TODO: check if the message came from a registered user;
        //if yes, save that message to the DB and associate with userID of the registered user.
        $user_exists = UserDB::is_user_registered($email);
        exit(var_dump($user_exists));
        $associated_id = [];
        if (!$user_exists) {
            //array to store IDs of admins to whom message will be associated
            $associated_id[] = ['id' => 1, 'id' => 3, 'id' => 4];
        } else {
            //get the ID of the registered user
            $id = UserDB::get_user_ID($email);
            //array to store IDs of the registered user AND the admins to whom the message will be associated
            $associated_id[] = ['id' => $id, 'id' => 1, 'id' => 3, 'id' => 4];
        }
        //save to the DB and return timestamp to front-end
        $time_saved = MessageDB::save_message($associated_id, $name, $email);
        $message = $time_saved;

        //exit and let user know message was received (ReactJS frontend will display custom message)
        exit($message);
}
