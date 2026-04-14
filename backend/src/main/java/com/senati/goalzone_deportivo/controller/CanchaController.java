package com.senati.goalzone_deportivo.controller;

import com.senati.goalzone_deportivo.entity.Cancha;
import com.senati.goalzone_deportivo.service.CanchaService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/canchas")
@CrossOrigin(origins = "*")
public class CanchaController {
    private final CanchaService canchaService;

    public CanchaController(CanchaService canchaService) {
        this.canchaService = canchaService;
    }

    @GetMapping
    public List<Cancha> listar() {
        return canchaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Cancha obtener(@PathVariable Long id) {
        return canchaService.obtenerPorId(id);
    }

    @PostMapping
    public Cancha crear(@RequestBody Cancha cancha) {
        return canchaService.guardar(cancha);
    }

    @PutMapping("/{id}")
    public Cancha actualizar(@PathVariable Long id, @RequestBody Cancha cancha) {
        cancha.setId(id);
        return canchaService.guardar(cancha);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        canchaService.eliminar(id);
    }
}