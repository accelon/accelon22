<script>
import EditorMain from './editormain.svelte';
import LibraryMain from './librarymain.svelte';
import {maintab} from './ts/store.ts'
const Mains={
	'builder':EditorMain,
	'library':LibraryMain
}
</script>
<svelte:component this={Mains[$maintab]}/>