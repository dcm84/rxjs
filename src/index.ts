import { queueScheduler, scheduled} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, catchError} from 'rxjs/operators';

const obsHub$ = ajax('https://api.github.com/search/repositories?q=rxjs').pipe(
  map(reposResponse => {
    //можно добавить пробелы, чтобы в браузере не разваливался вывод json-данных.
    return JSON.stringify(reposResponse["response"]["total_count"], null, 4);
    }),
  catchError(error => {
    console.error('catched error: ', error);
    return scheduled(error, queueScheduler);
  })
);
 
obsHub$.subscribe({
  next: value => console.log("github total: " + value),
  error: err => console.error(err)
});

const obsLab$ = ajax('https://gitlab.com/api/v4/projects?search=rxjs').pipe(
  map(reposResponse => reposResponse["response"].length)
);
 
obsLab$.subscribe({
  next: value => console.log("gitlab total: " + value),
});
