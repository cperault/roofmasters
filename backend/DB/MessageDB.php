<?php

/******************************************************************************************************************\
 *File:    MessageDB.php                                                                                           *
 *Author:  Christopher Perault                                                                                     *
 *Project: Roofmasters CMS (Customer Management System)                                                            *
 *Date:    October 7th, 2019                                                                                       *
 *Purpose: This class will store all queries relating to messages                                                  *
\******************************************************************************************************************/
class MessageDB
{
    public static function save_message($associated_id = [], $senderName, $senderEmail, $messageContent)
    {
        $db = Database::getDB();

        foreach ($associated_id as $value) {
            $query = 'INSERT INTO Messages (associatedID, senderName, senderEmail, messageContent)
                      VALUES (:associatedID, :senderName, :senderEmail, :messageContent)';
            $statement = $db->prepare($query);
            $statement->bindValue(':associatedID', $value['id']);
            $statement->bindValue(':senderName', $senderName);
            $statement->bindValue(':senderEmail', $senderEmail);
            $statement->bindValue(':messageContent', $messageContent);
            $statement->execute();
        }
        //last timestamp recorded in DB will be the timestamp returned
        $timestamp = $statement->fetch();
        $statement->closeCursor();
        //return the time at which the message was saved; this is automatically created by default in DB as a timestamp data type (YYYY-MM-DD hh:mm:ss)
        return $timestamp['messageTimeStamp'];
    }
}
