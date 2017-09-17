<?php



class CSVDB {
    public $filename;
    public $file;
    public $fields;

    /** Grab the file open, and grab fields */
    function __construct ($filename) {
        $this->filename = $filename;
        $this->file = fopen($filename,'c+');

        $this->fields = fgetcsv($this->file);
    }

    /** Closes the file handler. 
    Called after exit automatically. */
    function __destruct () {
        fclose($this->file);
    }

    /**
     * Creates the CSV row from an associative array $args
     * @param  {{Associative Array}} $args - Associative Array of arguments.
     */
    public function create ($args) {
        $fields = $this->fields;

        // Make sure this is a legit argument.
        if (count($args) != count($fields)) {
            throw new Exception("Incorrect arguments: ".$this->filename);
        }

        $row = []

        // Oooo, caching for speedups.
        for ($i = 0, $ii = count($fields); $i < $ii; $i++) {
            $row[$i] = $args[$fields[$i]];
        }

        fputcsv($this->file, $row);
    }

    public function read ($condition) {
        
    }

    public function update () {

    }

    public function delete () {

    }
}