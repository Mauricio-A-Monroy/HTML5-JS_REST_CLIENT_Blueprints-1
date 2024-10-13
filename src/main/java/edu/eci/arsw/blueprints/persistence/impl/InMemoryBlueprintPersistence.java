/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author hcadavid
 */
@Service
public class InMemoryBlueprintPersistence implements BlueprintsPersistence{

    private final ConcurrentHashMap<Tuple<String,String>,Blueprint> blueprints=new ConcurrentHashMap<>();

    public InMemoryBlueprintPersistence() {
        //load stub data
        Point[] pts1=new Point[]{new Point(140, 140),new Point(115, 115)};
        Blueprint bp1=new Blueprint("Felipe", "plano0",pts1);
        Point[] pts2=new Point[]{new Point(60, 20),new Point(100, 215)};
        Blueprint bp2=new Blueprint("Carlos", "plano1",pts2);
        Point[] pts3=new Point[]{new Point(30, 200),new Point(95, 20)};
        Blueprint bp3=new Blueprint("Carlos", "plano2",pts3);

        blueprints.put(new Tuple<>(bp1.getAuthor(),bp1.getName()), bp1);
        blueprints.put(new Tuple<>(bp2.getAuthor(),bp2.getName()), bp2);
        blueprints.put(new Tuple<>(bp3.getAuthor(),bp3.getName()), bp3);
        
    }    
    
    @Override
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(),bp.getName()))){
            throw new BlueprintPersistenceException("The given blueprint already exists: "+bp);
        }
        else if(bp.getName().equals("")){
            throw new BlueprintPersistenceException("The name can't be null");
        }
        else{
            blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        }        
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        Blueprint bp = blueprints.get(new Tuple<>(author, bprintname));
        if (bp == null){
            throw new BlueprintNotFoundException("No existe el plano");
        }
        return bp;
    }

    @Override
    public Set<Blueprint> getAllBluePrints(){
        Set<Blueprint> blueprintSet = new HashSet<>();

        for (Tuple<String, String> i : blueprints.keySet()){
            blueprintSet.add(blueprints.get(i));
        }

        return blueprintSet;
    }

    @Override
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException {
        Set<Blueprint> blueprintSet = new HashSet<>();

        for (Tuple<String, String> i : blueprints.keySet()){
            if(i.getElem1().equals(author)){
                blueprintSet.add(blueprints.get(i));
            }
        }
        if (blueprintSet.isEmpty()){
            throw new BlueprintNotFoundException("Do not exist Blueprints created by this author");
        }
        return blueprintSet;
    }

    @Override
    public void deleteBlueprint(String author, String bpname){
        blueprints.remove(new Tuple<>(author, bpname));
    }
    
}
