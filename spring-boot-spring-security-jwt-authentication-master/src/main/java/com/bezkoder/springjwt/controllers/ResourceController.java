package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.Service.IResourcesService;
import com.bezkoder.springjwt.models.Project;
import com.bezkoder.springjwt.models.ResourceQuantityDTO;
import com.bezkoder.springjwt.models.Resources;
import com.bezkoder.springjwt.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/resource")
public class ResourceController {
    IResourcesService resourcesService ;
    ProjectRepository projectRepository;

    // http://localhost:8089/resource/retrieve-all-resources
    @GetMapping("/retrieve-all-resources")
    @ResponseBody
    public List<Resources> getResources() {
        List<Resources> resourcesList = resourcesService.retrieveAllResources();
        return resourcesList;
    }

    @GetMapping("/retrieve-all-projects")
    @ResponseBody
    public List<Project> getProjects() {
        List<Project> projectList = projectRepository.findAll();
        return projectList;
    }


    @GetMapping("/retrieve-resource/{idRes}")
    @ResponseBody
    public Resources retrieveResource(@PathVariable("idRes") Long idRes) {
        return resourcesService.retrieveResource(idRes);
    }


    @PostMapping("/add-resource")
    @ResponseBody
    public Resources addResource(@RequestBody Resources r) {
        Resources resource= resourcesService.addResource(r);
        return resource;
    }


    @PutMapping("/update-resource")
    @ResponseBody
    public Resources updateResource(@RequestBody Resources r) {
        Resources resource= resourcesService.updateResource(r);
        return resource;
    }

    @DeleteMapping("/removeResource/{idRes}")
    @ResponseBody
    public void removeResource(@PathVariable("idRes") Long idRes) {
        resourcesService.removeResource(idRes);
    }



    @PostMapping("/projects/{projectId}")
    public ResponseEntity<?> affectResourcesToProject(@PathVariable("projectId") Long projectId, @RequestBody List<ResourceQuantityDTO> resourceQuantities) {
        try {
            resourcesService.affectResourcesToProject(projectId, resourceQuantities);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/{projectId}/resources")
    public ResponseEntity<?> getResourcesForProject(@PathVariable("projectId") Long projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + projectId));

        List<Resources> resources = project.getResources();
        return ResponseEntity.ok().body(resources);
    }
}
