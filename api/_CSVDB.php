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
     * Rewinds the file pointer back to the beginning.
     */
    private function _rewind () {
        rewind($this->file);
        // Get rid of first description line.
        fgetcsv($this->file);

        return $list;
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

        $row = [];

        // Oooo, caching for speedups.
        for ($i = 0, $ii = count($fields); $i < $ii; $i++) {
            $row[$i] = $args[$fields[$i]];
        }

        fputcsv($this->file, $row);
    }

    /**
     * Grabs an array of rows from the CSV based on the condition function.
     * @param  {{Function}} $condition - Boundry for the return list. 
     * @return {{Array}}               - List of events that satisfy $condition. 
     */
    public function read ($condition) {
        $list = [];

        // Grab the rows, and push them if they satisfy $condition.
        while ($row = fgetcsv($this->file)) {
            if ($condition($row)) {
                array_push($list, $row);
            }
        }
        
        $this->_rewind();
        return $list;
    }

    /**
     * Checks for the existence of a row based on a condition
     * @param  {{Function}} $condition - The condition the row must satisfy
     * @return {{Boolean}}             - True if the row exists
     */
    public function exists ($condition) {

        // Grab the rows, return true if they satisfy the condition
        while ($row = fgetcsv($this->file)) {
            if ($condition($row)) {
                $this->rewind();
                return true;
            }
        }
        
        $this->_rewind();
        return false;
    }

    public function update ($condition, $update) {
    }

    public function delete () {
    }
}