package edu.eci.arsw.blueprints.services;

import com.sun.jdi.ThreadReference;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;

import java.util.ArrayList;
import java.util.List;

public class BPThreadUpdateTest extends Thread {
    private String author;
    private String name;
    private BlueprintsServices blueprintsServices;
    private List<Point> newPoints;
    private String updateLog = "";

    public BPThreadUpdateTest(String author, String name, BlueprintsServices blueprintsServices, List<Point> newPoints){
        this.author = author;
        this.name = name;
        this.blueprintsServices = blueprintsServices;
        this.newPoints = newPoints;
    }

    public void run(){
        try {
            blueprintsServices.updateBlueprint(author, name, newPoints);
            Blueprint updatedBlueprint = blueprintsServices.getBlueprint(author, name);
            System.out.println("Actualizado por " + Thread.currentThread().getName() + ": " + updatedBlueprint.getPoints().toString());
            updateLog += "Actualizado por " + Thread.currentThread().getName() + ": " + updatedBlueprint.getPoints().toString();
        } catch (BlueprintNotFoundException e) {
            System.out.println("Error al actualizar el blueprint: " + e.getMessage());
        }
    }

    public String getUpdateLog(){
        return this.updateLog;
    }
}
