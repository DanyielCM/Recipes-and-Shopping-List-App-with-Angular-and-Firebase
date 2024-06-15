import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

// ResolveFn

@Injectable({providedIn: 'root'})
export class RecipesResolver implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService,
        private recipesService: RecipeService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Recipe[]> {
        const recipes = this.recipesService.getRecipes();

        if (recipes.length === 0 ) {
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}