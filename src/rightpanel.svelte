<script>
import EditorMain from './editormain.svelte';
import EditorToolbar from './editortoolbar.svelte';
import LibraryToolbar from './librarytoolbar.svelte';
import LibraryMain from './librarymain.svelte';
import {maintab} from './ts/store.ts'
const Toolbars={
	'builder':EditorToolbar,
	'library':LibraryToolbar
}
const Mains={
	'builder':EditorMain,
	'library':LibraryMain
}
</script>

<svelte:component this={Toolbars[$maintab]}/>
<svelte:component this={Mains[$maintab]}/>
