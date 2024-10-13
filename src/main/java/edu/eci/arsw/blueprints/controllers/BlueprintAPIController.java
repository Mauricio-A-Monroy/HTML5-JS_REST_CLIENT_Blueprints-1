/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.controllers;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.services.BlueprintsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *
 * @author hcadavid
 */
@RestController
@RequestMapping(value = "/blueprints")
public class BlueprintAPIController {

    @Autowired
    private BlueprintsServices blueprintsServices;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getAllBlueprints(){
        return new ResponseEntity<>(blueprintsServices.getAllBlueprints(), HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "{author}", method = RequestMethod.GET)
    public ResponseEntity<?> getBlueprintsByAuthor(@PathVariable String author){
        try {
            return new ResponseEntity<>(blueprintsServices.getBlueprintsByAuthor(author), HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "{author}/{bpname}", method = RequestMethod.GET)
    public ResponseEntity<?> getBlueprintsByAuthor(@PathVariable String author,
                                                   @PathVariable String bpname){
        try {
            return new ResponseEntity<>(blueprintsServices.getBlueprint(author, bpname), HttpStatus.ACCEPTED);
        } catch (BlueprintNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> addNewBluePrint(@RequestBody Blueprint blueprint){
        System.out.println(blueprint.toString());
        try {
            blueprintsServices.addNewBlueprint(blueprint);
        } catch (BlueprintPersistenceException e) {
            return new ResponseEntity<>("Plano no creado",HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "{author}/{bpname}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateBluePrint(@PathVariable String author,
                                             @PathVariable String bpname,
                                             @RequestBody List<Point> newPoints){
        try {
            blueprintsServices.updateBlueprint(author, bpname, newPoints);
        } catch (BlueprintNotFoundException e) {
            return new ResponseEntity<>("Plano no actualizado",HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "test", method = RequestMethod.GET)
    public ResponseEntity<?> test(){
        return new ResponseEntity<>(blueprintsServices.testThreads(), HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/updates", method = RequestMethod.GET)
    public ResponseEntity<?> getUpdateLog() {
        List<String> updateLog = blueprintsServices.testUpdateWithThreads();
        return new ResponseEntity<>(updateLog, HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "{author}/{bpname}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteBlueprint(@PathVariable String author,
                                             @PathVariable String bpname){
        blueprintsServices.deleteBlueprint(author, bpname);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}

