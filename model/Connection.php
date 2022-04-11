<?php
  class Connection {
    public $connection;
    private $host;
    private $username;
    private $password;
    private $database;
    private $port;
    private $iniFile;

    public function __construct() {
      $this->iniFile = parse_ini_file('Config.ini', true);
      $this->host = $this->iniFile["Connection"]["host"];
      $this->username = $this->iniFile["Connection"]["user"];
      $this->password = $this->iniFile["Connection"]["password"];
      $this->database = $this->iniFile["Connection"]["db"];
      $this->port = 3306;
    }

    function connect() {
      $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database, $this->port);
      $this->query("SET NAMES utf8");
    }

    function disconnect(){
      $this->connection->close();
    }

    function query($sql, $multi = false) {
      try {
        if ($multi) {
          return mysqli_multi_query($this->connection, $sql); // or die("Error: " . $this->connection->error);
        }
        return mysqli_query($this->connection, $sql);//  or die("Error: " . $this->connection->error);
      } catch(Exception $e) {
        return null;
      }
    }

  }
?>
