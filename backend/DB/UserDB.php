<?php

/******************************************************************************************************************\
 *File:    user_db.php                                                                                             *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    August 8th, 2019                                                                                        *
 *Purpose: This class will store all queries relating to users                                                     *
\******************************************************************************************************************/
class UserDB
{
    public static function add_user($first_name, $last_name, $phone_number, $email_address, $user_password)
    {
        $db = Database::getDB();
        $query = 'INSERT into RMUsers (firstName, lastName, phoneNumber, emailAddress, userPassword)
                  VALUES (:first_name, :last_name, :phone_number, :email_address, :user_password)';
        $statement = $db->prepare($query);
        $statement->bindValue(':first_name', $first_name);
        $statement->bindValue(':last_name', $last_name);
        $statement->bindValue(':phone_number', $phone_number);
        $statement->bindValue(':email_address', $email_address);
        $statement->bindValue(':user_password', $user_password);
        $statement->execute();
        $user_id = $statement->fetch();
        $statement->closeCursor();
        return $user_id['userID'];
    }

    public static function get_password($email_address)
    {
        $db = Database::getDB();
        $query = 'SELECT userPassword
                  FROM RMUsers 
                  WHERE emailAddress = :email_address';
        $statement = $db->prepare($query);
        $statement->bindValue(':email_address', $email_address);
        $statement->execute();
        $password = $statement->fetch();
        $statement->closeCursor();
        return $password['userPassword'];
    }

    public static function get_user_ID($email_address)
    {
        $db = Database::getDB();
        $query = 'SELECT userID
                  FROM RMUsers 
                  WHERE emailAddress = :email_address';
        $statement = $db->prepare($query);
        $statement->bindValue(':email_address', $email_address);
        $statement->execute();
        $password = $statement->fetch();
        $statement->closeCursor();
        return $password['userID'];
    }

    public static function get_user_info($email_address)
    {
        $db = Database::getDB();
        $query = 'SELECT userID, firstName, lastName, phoneNumber, emailAddress
                  FROM RMUsers
                  WHERE emailAddress = :email_address';
        $statement = $db->prepare($query);
        $statement->bindValue(':email_address', $email_address);
        $statement->execute();
        $user_object = $statement->fetchAll();

        $user = [];
        foreach ($user_object as $value) {
            $user[] = array('userID' => $value['userID']);
            $user[] = array('firstName' => $value['firstName']);
            $user[] = array('lastName' => $value['lastName']);
            $user[] = array('phoneNumber' => $value['phoneNumber']);
            $user[] = array('emailAddress' => $value['emailAddress']);
        }
        $statement->closeCursor();
        return $user;
    }

    public static function is_user_registered($email_address)
    {
        $db = Database::getDB();
        $query = "SELECT EXISTS(SELECT * FROM RMUsers WHERE emailAddress = :email_address) as 'user_exists'";
        $statement = $db->prepare($query);
        $statement->bindValue(':email_address', $email_address);
        $statement->execute();
        $userExists = $statement->fetch();
        $statement->closeCursor();

        return $userExists['user_exists'];
    }
}
